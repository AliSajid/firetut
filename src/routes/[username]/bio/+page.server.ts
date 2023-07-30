import type { PageServerLoad } from './$types';
import { adminAuth, adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
  const sessionCookie = cookies.get('__session');

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    const userDoc = await adminDB.collection('users').doc(decodedClaims.uid).get();
    const user = userDoc.data();

    return {
      bio: user?.bio,
    };
  } catch (err) {
    throw error(401, 'Invalid session!');
  }
}) satisfies PageServerLoad;
