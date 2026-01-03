import { useState } from 'react';
import { Shield, Edit, Trash2, Plus, Check, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', slug: 'super_admin', permissions: ['*'], users: 1 },
    { id: 2, name: 'Admin', slug: 'admin', permissions: ['user.manage', 'dashboard.view'], users: 3 },
    { id: 3, name: 'User', slug: 'user', permissions: ['profile.view', 'dashboard.view'], users: 50 },
  ]);

  const [editingRole, setEditingRole] = useState(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', slug: '', permissions: [] });

  const allPermissions = [
    'user.create',
    'user.read', 
    'user.update',
    'user.delete',
    'role.manage',
    'dashboard.view',
    'settings.manage',
    'profile.view',
    'profile.update'
  ];

  const handleAddRole = () => {
    if (!newRole.name || !newRole.slug) {
      toast.error('Name and slug are required');
      return;
    }

    const newRoleObj = {
      id: roles.length + 1,
      ...newRole,
      users: 0
    };

    setRoles([...roles, newRoleObj]);
    setNewRole({ name: '', slug: '', permissions: [] });
    setShowAddRole(false);
    toast.success('Role added successfully');
  };

  const handleDeleteRole = (roleId) => {
    Swal.fire({
      title: 'Delete Role?',
      text: 'Are you sure you want to delete this role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setRoles(roles.filter(role => role.id !== roleId));
        toast.success('Role deleted successfully');
      }
    });
  };

  const handlePermissionToggle = (roleId, permission) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const newPermissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        
        return { ...role, permissions: newPermissions };
      }
      return role;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600">Manage roles and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddRole(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Moderator"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Slug
                </label>
                <input
                  type="text"
                  value={newRole.slug}
                  onChange={(e) => setNewRole({...newRole, slug: e.target.value.toLowerCase().replace(/\s+/g, '_')})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., moderator"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddRole(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.slug}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                {role.slug !== 'super_admin' && role.slug !== 'user' && (
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Permissions</span>
                <span className="text-sm font-medium">{role.permissions.length} permissions</span>
              </div>
              
              {editingRole === role.id ? (
                <div className="space-y-2">
                  {allPermissions.map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={role.permissions.includes('*') || role.permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(role.id, permission)}
                        className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                        disabled={role.permissions.includes('*')}
                      />
                      <span className="ml-2 text-sm text-gray-700">{permission}</span>
                    </label>
                  ))}
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setEditingRole(null)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingRole(null)}
                      className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.includes('*') ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      All Permissions
                    </span>
                  ) : (
                    role.permissions.slice(0, 3).map(permission => (
                      <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {permission}
                      </span>
                    ))
                  )}
                  {role.permissions.length > 3 && !role.permissions.includes('*') && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      +{role.permissions.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assigned Users</span>
                <span className="font-medium">{role.users} users</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;