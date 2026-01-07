import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  User, 
  BookOpen, 
  FileText, 
  Download,
  Loader2,
  Calendar,
  GraduationCap,
  Users,
  Briefcase,
  Bell,
  Settings
} from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

interface LearningMaterial {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  subject: string | null;
  class_level: string | null;
  created_at: string;
}

const PortalDashboard = () => {
  const navigate = useNavigate();
  const { user, profile, role, loading, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    bio: '',
    department: '',
    position: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/portal');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        department: profile.department || '',
        position: profile.position || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('learning_materials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching materials:', error);
      } else {
        setMaterials(data as LearningMaterial[]);
      }
      setLoadingMaterials(false);
    };

    if (user) {
      fetchMaterials();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.'
    });
    navigate('/portal');
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profileForm.full_name,
        phone: profileForm.phone,
        bio: profileForm.bio,
        department: profileForm.department,
        position: profileForm.position
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.'
      });
      setEditMode(false);
      refreshProfile();
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'student':
        return <GraduationCap className="h-5 w-5" />;
      case 'alumni':
        return <Users className="h-5 w-5" />;
      case 'teacher':
        return <BookOpen className="h-5 w-5" />;
      case 'staff':
      case 'non_teaching_staff':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'alumni':
        return 'Alumni';
      case 'teacher':
        return 'Teacher';
      case 'staff':
        return 'Staff';
      case 'non_teaching_staff':
        return 'Non-Teaching Staff';
      default:
        return 'Member';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 sticky top-16 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary-foreground/20">
              <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">{profile.full_name}</h1>
              <div className="flex items-center gap-2 text-sm opacity-80">
                {getRoleIcon()}
                <span>{getRoleLabel()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Welcome back, {profile.full_name.split(' ')[0]}!
                </h2>
              </motion.div>
            </AnimatedSection>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnimatedSection delay={0.1}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Materials</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{materials.length}</div>
                    <p className="text-xs text-muted-foreground">Learning resources available</p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Role</CardTitle>
                    {getRoleIcon()}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getRoleLabel()}</div>
                    <p className="text-xs text-muted-foreground">
                      {profile.department || profile.admission_number || 'Rubiri High School'}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <p className="text-xs text-muted-foreground">Active member</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Role-Specific Content */}
            <AnimatedSection delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for {getRoleLabel().toLowerCase()}s</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {role === 'student' && (
                      <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <BookOpen className="h-6 w-6" />
                          <span>View Notes</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <FileText className="h-6 w-6" />
                          <span>Past Papers</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Download className="h-6 w-6" />
                          <span>Downloads</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                      </>
                    )}
                    {(role === 'teacher' || role === 'staff') && (
                      <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <BookOpen className="h-6 w-6" />
                          <span>Upload Materials</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Users className="h-6 w-6" />
                          <span>View Students</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <FileText className="h-6 w-6" />
                          <span>Create Content</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                      </>
                    )}
                    {role === 'alumni' && (
                      <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Users className="h-6 w-6" />
                          <span>Alumni Network</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <BookOpen className="h-6 w-6" />
                          <span>Mentorship</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Calendar className="h-6 w-6" />
                          <span>Events</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                      </>
                    )}
                    {role === 'non_teaching_staff' && (
                      <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Briefcase className="h-6 w-6" />
                          <span>Work Schedule</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <FileText className="h-6 w-6" />
                          <span>Documents</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Bell className="h-6 w-6" />
                          <span>Announcements</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>Learning Materials</CardTitle>
                  <CardDescription>
                    Access study notes, past papers, and educational resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingMaterials ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : materials.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No Materials Yet</h3>
                      <p className="text-muted-foreground">
                        Learning materials will appear here once uploaded by teachers.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {materials.map((material) => (
                        <Card key={material.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="bg-primary/10 p-3 rounded-lg">
                                <FileText className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{material.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {material.subject} • {material.class_level}
                                </p>
                              </div>
                            </div>
                            {material.file_url && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Profile</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button 
                      variant={editMode ? "default" : "outline"}
                      onClick={() => editMode ? handleUpdateProfile() : setEditMode(true)}
                    >
                      {editMode ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">
                        {getInitials(profile.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{profile.full_name}</h3>
                      <p className="text-muted-foreground">{profile.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                          {getRoleLabel()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!editMode}
                      />
                    </div>
                    {(role === 'teacher' || role === 'staff' || role === 'non_teaching_staff') && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={profileForm.department}
                            onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={profileForm.position}
                            onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                            disabled={!editMode}
                          />
                        </div>
                      </>
                    )}
                    {role === 'student' && profile.admission_number && (
                      <div className="space-y-2">
                        <Label>Admission Number</Label>
                        <Input value={profile.admission_number} disabled />
                      </div>
                    )}
                    {role === 'alumni' && profile.year_of_graduation && (
                      <div className="space-y-2">
                        <Label>Year of Graduation</Label>
                        <Input value={profile.year_of_graduation} disabled />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      disabled={!editMode}
                      rows={4}
                    />
                  </div>

                  {editMode && (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PortalDashboard;
