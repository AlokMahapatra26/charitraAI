import React from 'react';
import { getPremiumStatus, getUser } from '@/auth/server';
import MyCharacters from '@/components/MyCharacters';
import { Separator } from '@/components/ui/separator';
import { Star, User2, Venus, Mail, Cake } from 'lucide-react';

export default async function User() {
  const user = await getUser();
  const isPremium = await getPremiumStatus()


  return (
    <>
    <div className="p-6 rounded-2xl text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">👤 Profile</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Welcome, {user?.user_metadata?.displayName?.split(" ")[0] || "User"}!
      </p>

      <div className="space-y-4 text-left">
        <div className="flex items-center gap-3">
          <User2 className="text-muted-foreground" size={18} />
          <span className="text-sm text-muted-foreground">Name:</span>
          <span className="font-medium text-foreground">
            {user?.user_metadata?.displayName || "Not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-muted-foreground" size={18} />
          <span className="text-sm text-muted-foreground">Email:</span>
          <span className="text-sm text-foreground">{user?.email || "Not provided"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Cake className="text-muted-foreground" size={18} />
          <span className="text-sm text-muted-foreground">Age:</span>
          <span className="font-medium text-foreground">
            {user?.user_metadata?.age || "Not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Venus className="text-muted-foreground" size={18} />
          <span className="text-sm text-muted-foreground">Gender:</span>
          <span className="font-medium text-foreground">
            {user?.user_metadata?.gender || "Not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Star className={isPremium ? "text-yellow-500" : "text-muted-foreground"} size={18} />
          <span className="text-sm text-muted-foreground">Premium:</span>
          <span
            className={`font-semibold ${
              isPremium ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPremium ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Do not disturb this component */}
      
    </div>
    <MyCharacters />
    </>

  );
}