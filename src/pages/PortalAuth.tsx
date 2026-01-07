import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { z } from 'zod';

type PortalType = 'student' | 'alumni' | 'teacher' | 'staff' | 'non_teaching_staff';

const portalTitles: Record<PortalType, string> = {
  student: 'Student Portal',
  alumni: 'Alumni Portal',
  teacher: 'Teachers Portal',
  staff: 'Staff Portal',
  non_teaching_staff: 'Non-Teaching Staff Portal'
};

// Validation schemas
const loginSchema = z.object({
  identifier: z.string().min(1, 'This field is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  admissionNumber: z.string().optional(),
  yearOfGraduation: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const PortalAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const portalType = (searchParams.get('type') as PortalType) || 'student';
  
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form states
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    admissionNumber: '',
    yearOfGraduation: '',
    department: '',
    position: ''
  });
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      navigate(`/portal/dashboard`);
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const validated = loginSchema.parse(loginForm);
      setLoading(true);

      // For students, login with admission number as email prefix
      let email = validated.identifier;
      if (portalType === 'student' && !validated.identifier.includes('@')) {
        email = `${validated.identifier}@rubiri.student.local`;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: validated.password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login Failed',
            description: 'Invalid credentials. Please check your email/admission number and password.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive'
          });
        }
        return;
      }

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.'
      });
      navigate('/portal/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = registerSchema.parse(registerForm);
      setLoading(true);

      // For students, create email from admission number
      let email = validated.email;
      if (portalType === 'student' && registerForm.admissionNumber) {
        email = `${registerForm.admissionNumber}@rubiri.student.local`;
      }

      const redirectUrl = `${window.location.origin}/portal/dashboard`;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: validated.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: validated.fullName
          }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          toast({
            title: 'Registration Failed',
            description: 'This email or admission number is already registered. Please login instead.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Registration Failed',
            description: authError.message,
            variant: 'destructive'
          });
        }
        return;
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase.from('profiles').insert({
          user_id: authData.user.id,
          full_name: validated.fullName,
          email: validated.email,
          phone: validated.phone || null,
          admission_number: registerForm.admissionNumber || null,
          year_of_graduation: registerForm.yearOfGraduation || null,
          department: registerForm.department || null,
          position: registerForm.position || null
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Create user role
        const { error: roleError } = await supabase.from('user_roles').insert({
          user_id: authData.user.id,
          role: portalType
        });

        if (roleError) {
          console.error('Role creation error:', roleError);
        }

        toast({
          title: 'Registration Successful!',
          description: 'Your account has been created. You can now login.'
        });
        
        navigate('/portal/dashboard');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setErrors({ resetEmail: 'Email is required' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/portal/auth?type=${portalType}`
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for the password reset link.'
      });
      setActiveTab('login');
    }
    setLoading(false);
  };

  const renderRoleSpecificFields = () => {
    switch (portalType) {
      case 'student':
        return (
          <div className="space-y-2">
            <Label htmlFor="admissionNumber">Admission Number *</Label>
            <Input
              id="admissionNumber"
              placeholder="Enter your admission number"
              value={registerForm.admissionNumber}
              onChange={(e) => setRegisterForm({ ...registerForm, admissionNumber: e.target.value })}
              required
            />
            {errors.admissionNumber && <p className="text-sm text-destructive">{errors.admissionNumber}</p>}
          </div>
        );
      case 'alumni':
        return (
          <div className="space-y-2">
            <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
            <Input
              id="yearOfGraduation"
              placeholder="e.g., 2020"
              value={registerForm.yearOfGraduation}
              onChange={(e) => setRegisterForm({ ...registerForm, yearOfGraduation: e.target.value })}
            />
          </div>
        );
      case 'teacher':
      case 'staff':
      case 'non_teaching_staff':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Sciences, Administration"
                value={registerForm.department}
                onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Title</Label>
              <Input
                id="position"
                placeholder="e.g., Mathematics Teacher, Principal"
                value={registerForm.position}
                onChange={(e) => setRegisterForm({ ...registerForm, position: e.target.value })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container mx-auto max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/portal')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portal Selection
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{portalTitles[portalType]}</CardTitle>
              <CardDescription>
                {activeTab === 'login' && 'Sign in to access your portal'}
                {activeTab === 'register' && 'Create your account to get started'}
                {activeTab === 'reset' && 'Reset your password'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register' | 'reset')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="identifier">
                        {portalType === 'student' ? 'Admission Number' : 'Email'}
                      </Label>
                      <Input
                        id="identifier"
                        type={portalType === 'student' ? 'text' : 'email'}
                        placeholder={portalType === 'student' ? 'Enter admission number' : 'Enter your email'}
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                      />
                      {errors.identifier && <p className="text-sm text-destructive">{errors.identifier}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Sign In
                    </Button>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setActiveTab('reset')}
                      >
                        Forgot password?
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                      />
                      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      />
                    </div>

                    {renderRoleSpecificFields()}

                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Password *</Label>
                      <div className="relative">
                        <Input
                          id="regPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      />
                      {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="reset">
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail">Email</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                      {errors.resetEmail && <p className="text-sm text-destructive">{errors.resetEmail}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Send Reset Link
                    </Button>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setActiveTab('login')}
                      >
                        Back to login
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalAuth;
