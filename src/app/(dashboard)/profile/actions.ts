'use server';

import prisma from '@/lib/prisma';
import { actionWithAuth } from '@/lib/safe-action';
import { accountSchema, changePasswordSchema, avatarSchema } from '@dashboard/profile/validate';
import { hash } from 'bcryptjs';
import { env } from '@/lib/env';
import { getRandomString } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

interface Upload {
  data: {
    url: string;
  };
}

export const changePasswordAction = actionWithAuth
  .metadata({ name: 'change_password' })
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { password }, ctx: { userId } }) => {
    try {
      const passwordHash = await hash(password, 10);
      await prisma.user.update({
        where: {
          id: +userId,
        },
        data: {
          password: passwordHash,
        },
      });
      return { success: true };
    } catch {
      return { error: 'An error occurred during password change' };
    }
  });

export const uploadAvatarAction = actionWithAuth
  .metadata({ name: 'upload_avatar' })
  .schema(avatarSchema)
  .action(async ({ parsedInput: { image }, ctx: { userId } }) => {
    const formData = new FormData();
    const extension = image.name.split('.').pop();
    const name = getRandomString(12);
    const renamedImage = new File([image], `${name}.${extension}`, { type: image.type });
    formData.append('image', renamedImage);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${env.IMGBB_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const dataResponse = (await response.json()) as Upload;

    await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        image: dataResponse.data.url,
      },
    });

    revalidatePath('/profile');
  });

export const changeNameAction = actionWithAuth
  .metadata({ name: 'change_user_name' })
  .schema(accountSchema)
  .action(async ({ parsedInput: { name }, ctx: { userId } }) => {
    await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        name,
      },
    });

    revalidatePath('/profile');
  });
