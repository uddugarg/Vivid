/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    redirect('/dashboard');
}

export default Page