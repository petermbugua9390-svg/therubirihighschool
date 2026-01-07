import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  UserCheck, 
  UserX, 
  Clock,
  Search,
  Loader2,
  LogOut,
  RefreshCw,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  GraduationCap,
  BookOpen,
  Briefcase,
  UserCog
} from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  admission_number: string | null;
  year_of_graduation: string | null;
  department: string | null;
  position: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

interface RegistrationRequest {
  id: string;
  user_id: string;
  requested_role: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  admission_number: string | null;
  department: string | null;
  position: string | null;
  status: string;
  created_at: string;
}

interface UserWithRole extends UserProfile {
  role?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    role: ''
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/portal');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive'
      });
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchRequests()]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return;
    }

    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
    }

    const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => ({
      ...profile,
      role: roles?.find(r => r.user_id === profile.user_id)?.role
    }));

    setUsers(usersWithRoles);
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('registration_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
      return;
    }

    setRequests(data || []);
  };

  const handleApproveRequest = async () => {
    if (!selectedRequest) return;

    try {
      // Update the request status
      const { error: updateError } = await supabase
        .from('registration_requests')
        .update({
          status: 'approved',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.id);

      if (updateError) throw updateError;

      toast({
        title: 'Request Approved',
        description: `${selectedRequest.full_name}'s registration has been approved.`
      });

      setApproveDialogOpen(false);
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve request. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest) return;

    try {
      const { error: updateError } = await supabase
        .from('registration_requests')
        .update({
          status: 'rejected',
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          rejection_reason: rejectionReason
        })
        .eq('id', selectedRequest.id);

      if (updateError) throw updateError;

      toast({
        title: 'Request Rejected',
        description: `${selectedRequest.full_name}'s registration has been rejected.`
      });

      setRejectDialogOpen(false);
      setSelectedRequest(null);
      setRejectionReason('');
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject request. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleEditUser = (userProfile: UserWithRole) => {
    setSelectedUser(userProfile);
    setEditForm({
      full_name: userProfile.full_name,
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      department: userProfile.department || '',
      position: userProfile.position || '',
      role: userProfile.role || ''
    });
    setEditDialogOpen(true);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          email: editForm.email,
          phone: editForm.phone,
          department: editForm.department,
          position: editForm.position
        })
        .eq('id', selectedUser.id);

      if (profileError) throw profileError;

      // Update role if changed
      if (editForm.role && editForm.role !== selectedUser.role) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: editForm.role as any })
          .eq('user_id', selectedUser.user_id);

        if (roleError) throw roleError;
      }

      toast({
        title: 'User Updated',
        description: `${editForm.full_name}'s profile has been updated.`
      });

      setEditDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      // Delete from profiles (cascades to user_roles via foreign key)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast({
        title: 'User Deleted',
        description: `${selectedUser.full_name} has been removed from the system.`
      });

      setDeleteDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      case 'teacher':
        return <BookOpen className="h-4 w-4" />;
      case 'staff':
      case 'non_teaching_staff':
        return <Briefcase className="h-4 w-4" />;
      case 'alumni':
        return <Users className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <UserCog className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'teacher':
        return 'bg-purple-100 text-purple-800';
      case 'staff':
        return 'bg-orange-100 text-orange-800';
      case 'non_teaching_staff':
        return 'bg-teal-100 text-teal-800';
      case 'alumni':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.admission_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    staff: users.filter(u => u.role === 'staff' || u.role === 'non_teaching_staff').length,
    alumni: users.filter(u => u.role === 'alumni').length,
    pending: requests.length
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 sticky top-16 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary-foreground/20 p-3 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-semibold text-xl">Admin Dashboard</h1>
              <p className="text-sm opacity-80">Manage users, approvals, and access control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={fetchData}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => {
                signOut();
                navigate('/portal');
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <AnimatedSection delay={0}>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card>
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{stats.students}</div>
                <p className="text-xs text-muted-foreground">Students</p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold">{stats.teachers}</div>
                <p className="text-xs text-muted-foreground">Teachers</p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Card>
              <CardContent className="p-4 text-center">
                <Briefcase className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <div className="text-2xl font-bold">{stats.staff}</div>
                <p className="text-xs text-muted-foreground">Staff</p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold">{stats.alumni}</div>
                <p className="text-xs text-muted-foreground">Alumni</p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <Card className={requests.length > 0 ? 'border-yellow-500' : ''}>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              All Users
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              <Clock className="h-4 w-4 mr-2" />
              Pending Approvals
              {requests.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-500 rounded-full text-xs flex items-center justify-center text-white">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all registered users</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="teacher">Teachers</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="non_teaching_staff">Non-Teaching</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((userProfile) => (
                          <TableRow key={userProfile.id}>
                            <TableCell className="font-medium">{userProfile.full_name}</TableCell>
                            <TableCell>{userProfile.email || '-'}</TableCell>
                            <TableCell>
                              {userProfile.role && (
                                <Badge className={`${getRoleBadgeColor(userProfile.role)} flex items-center gap-1 w-fit`}>
                                  {getRoleIcon(userProfile.role)}
                                  {userProfile.role.replace('_', ' ')}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{userProfile.department || userProfile.admission_number || '-'}</TableCell>
                            <TableCell>
                              {new Date(userProfile.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditUser(userProfile)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => {
                                    setSelectedUser(userProfile);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Registration Requests</CardTitle>
                <CardDescription>Review and approve or reject new user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-12">
                    <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No Pending Requests</h3>
                    <p className="text-muted-foreground">
                      All registration requests have been processed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <Card key={request.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{request.full_name}</h4>
                                <Badge className={getRoleBadgeColor(request.requested_role)}>
                                  {request.requested_role.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{request.email}</p>
                              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                {request.phone && <span>📞 {request.phone}</span>}
                                {request.department && <span>🏢 {request.department}</span>}
                                {request.position && <span>💼 {request.position}</span>}
                                {request.admission_number && <span>🎓 {request.admission_number}</span>}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Submitted: {new Date(request.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setApproveDialogOpen(true);
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setRejectDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input
                  id="edit-department"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Input
                  id="edit-position"
                  value={editForm.position}
                  onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editForm.role} onValueChange={(v) => setEditForm({ ...editForm, role: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="non_teaching_staff">Non-Teaching Staff</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.full_name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Registration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {selectedRequest?.full_name}'s registration as {selectedRequest?.requested_role.replace('_', ' ')}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApproveRequest} className="bg-green-600 hover:bg-green-700">
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Registration</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedRequest?.full_name}'s registration.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason">Rejection Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectRequest}>
              Reject Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
