
```js
/**
 * Example: Integrating OrgChart with PayloadCMS3
 * 
 * This example shows how to fetch user data from Payload using the client SDK
 * and render it in the OrgChart component.
 */

import React from 'react';
import { OrgChart } from '../OrgChart';
import type { User } from '../types';

/**
 * Server Component Example (Next.js App Router)
 * 
 * Use this approach in a server component to fetch data at build/request time.
 */
export async function OrgChartServerComponent() {
  // Import Payload config (adjust path to your project structure)
  const { getPayload } = await import('payload');
  const config = await import('@/payload.config').then((m) => m.default);
  
  // Get Payload instance
  const payload = await getPayload({ config });
  
  // Fetch all users with manager relationships
  const usersResponse = await payload.find({
    collection: 'users',
    depth: 2, // Include manager relationship data
    limit: 1000, // Adjust based on your org size
  });
  
  // Transform Payload data to OrgChart format
  const users: User[] = usersResponse.docs.map((doc) => ({
    id: doc.id,
    name: doc.name || '',
    email: doc.email,
    jobRole: doc.jobRole,
    manager: doc.manager,
    about: doc.about,
    profilePicture: doc.profilePicture
      ? {
          url: typeof doc.profilePicture === 'object' 
            ? doc.profilePicture.url 
            : doc.profilePicture,
          alt: doc.name,
        }
      : undefined,
  }));
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Organization Chart</h1>
      <OrgChart 
        users={users} 
        expandable={true}
        initiallyExpanded={true}
      />
    </div>
  );
}

/**
 * Client Component Example (with Server Action or API Route)
 * 
 * Use this approach when you need client-side interactivity.
 */
'use client';

interface OrgChartClientComponentProps {
  initialUsers: User[];
}

export function OrgChartClientComponent({ initialUsers }: OrgChartClientComponentProps) {
  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  
  const handleNodeClick = (user: User) => {
    setSelectedUser(user);
    // You could also navigate to a user detail page here
    // router.push(`/team/${user.id}`);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Organization Chart</h1>
        <p className="text-muted-foreground mt-2">
          Click on any team member to view details
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Org Chart */}
        <div className="lg:col-span-2">
          <OrgChart 
            users={users}
            onNodeClick={handleNodeClick}
            expandable={true}
            initiallyExpanded={true}
          />
        </div>
        
        {/* Selected User Details */}
        <div className="lg:col-span-1">
          {selectedUser ? (
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Team Member Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                {selectedUser.jobRole && (
                  <div>
                    <label className="text-sm text-muted-foreground">Role</label>
                    <p className="font-medium">{selectedUser.jobRole}</p>
                  </div>
                )}
                {selectedUser.about && (
                  <div>
                    <label className="text-sm text-muted-foreground">About</label>
                    <p className="text-sm">{selectedUser.about}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
              <p className="text-muted-foreground">
                Select a team member to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * API Route Example (Next.js App Router)
 * 
 * Create this file at: app/api/org-chart/route.ts
 */
export async function GET() {
  const { getPayload } = await import('payload');
  const config = await import('@/payload.config').then((m) => m.default);
  
  const payload = await getPayload({ config });
  
  const usersResponse = await payload.find({
    collection: 'users',
    depth: 2,
    limit: 1000,
  });
  
  const users: User[] = usersResponse.docs.map((doc) => ({
    id: doc.id,
    name: doc.name || '',
    email: doc.email,
    jobRole: doc.jobRole,
    manager: doc.manager,
    about: doc.about,
    profilePicture: doc.profilePicture
      ? {
          url: typeof doc.profilePicture === 'object' 
            ? doc.profilePicture.url 
            : doc.profilePicture,
          alt: doc.name,
        }
      : undefined,
  }));
  
  return Response.json({ users });
}

/**
 * Server Action Example (Next.js App Router)
 * 
 * Create this file at: app/actions/getOrgChartData.ts
 */
'use server';

export async function getOrgChartData(): Promise<User[]> {
  const { getPayload } = await import('payload');
  const config = await import('@/payload.config').then((m) => m.default);
  
  const payload = await getPayload({ config });
  
  const usersResponse = await payload.find({
    collection: 'users',
    depth: 2,
    limit: 1000,
    // Optional: Add sorting
    sort: 'name',
  });
  
  return usersResponse.docs.map((doc) => ({
    id: doc.id,
    name: doc.name || '',
    email: doc.email,
    jobRole: doc.jobRole,
    manager: doc.manager,
    about: doc.about,
    profilePicture: doc.profilePicture
      ? {
          url: typeof doc.profilePicture === 'object' 
            ? doc.profilePicture.url 
            : doc.profilePicture,
          alt: doc.name,
        }
      : undefined,
  }));
}

/**
 * Usage in a page component:
 * 
 * import { getOrgChartData } from '@/app/actions/getOrgChartData';
 * import { OrgChartClientComponent } from '@/components/OrgChartClientComponent';
 * 
 * export default async function OrgChartPage() {
 *   const users = await getOrgChartData();
 *   return <OrgChartClientComponent initialUsers={users} />;
 * }
 */
```