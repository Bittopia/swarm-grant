import { modal } from '$lib/web3/modal';
import { invalidateAll } from '$app/navigation';
import type { UserType } from '$lib/types/user';

export async function toggleSociety({
	user,
	societyId,
	alreadyMember
}: {
	user: UserType;
	societyId: string;
	alreadyMember: boolean;
}) {
	if (!user) {
		return modal.open();
	}

	try {
		const url = alreadyMember ? '/societies/leave' : '/societies/join';

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ societyId })
		});

		if (response.ok) {
			const data = await response.json();

			if (data.success) {
				await invalidateAll();
			}
		}
	} catch (error) {
		console.log('error', error);
	}
}
