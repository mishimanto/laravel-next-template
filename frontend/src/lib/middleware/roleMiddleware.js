import { NextResponse } from 'next/server';

export function roleMiddleware(request, allowedRoles = []) {
  const userRole = request.headers.get('x-user-role');
  
  if (!userRole) {
    return NextResponse.json(
      { success: false, message: 'User role not found' },
      { status: 401 }
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return NextResponse.json(
      { success: false, message: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Example usage in API route:
/*
export async function GET(request) {
  const roleCheck = roleMiddleware(request, ['admin', 'super_admin']);
  if (roleCheck instanceof NextResponse) return roleCheck;
  
  // Continue with your logic
}
*/