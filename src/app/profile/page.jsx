import { redirect } from 'next/navigation';
import { getCurrentUserProfile } from '@/services/profile';
import ProfilePage from './ProfilePage';

export default async function Profile() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/login');
  }

  return <ProfilePage initialProfile={profile} />;
}
