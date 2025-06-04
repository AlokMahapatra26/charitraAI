import React from "react";
import { getUserAction } from "@/actions/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const user = await getUserAction(params.id);

  if (!user) {
    return (
      <div className="text-center text-destructive mt-10 px-4">
        User not found
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserInfo label="Name" value={user.name} />
          <UserInfo label="Email" value={user.email} />
          <UserInfo label="Age" value={String(user.age)} />
          <UserInfo label="Gender" value={user.gender} />
          <UserInfo
            label="Joined"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"
            }
          />
        </CardContent>
      </Card>
    </main>
  );
};

interface UserInfoProps {
  label: string;
  value: string;
}

function UserInfo({ label, value }: UserInfoProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <span className="font-medium text-foreground">{label}</span>
      <span className="text-muted-foreground mt-1 sm:mt-0 break-words">{value}</span>
    </div>
  );
}

export default Page;
