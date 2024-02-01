import { modal } from '$lib/web3/modal';
import { invalidateAll } from '$app/navigation';
import type { UserType } from '$lib/types/user';

export async function toggleCourseEnroll({
	user,
	societyId,
	courseId,
	alreadyMember
}: {
	user: UserType;
	societyId: string;
	courseId: string;
	alreadyMember: boolean;
}) {
	if (!user) {
		return modal.open();
	}

	try {
		const url = alreadyMember
			? `/societies/${societyId}/courses/${courseId}/leave`
			: `/societies/${societyId}/courses/${courseId}/join`;

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		console.log('LS -> src/lib/utils/course.ts:28 -> response: ', response);

		if (response.ok) {
			const data = await response.json();

			console.log('LS -> src/lib/utils/course.ts:31 -> data: ', data);

			if (data.success) {
				await invalidateAll();
			}
		}
	} catch (error) {
		console.log('error', error);
	}
}
