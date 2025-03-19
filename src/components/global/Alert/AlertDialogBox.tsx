import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
    children: React.ReactNode
    classname?: string
    description: string
    loading?: boolean
    onCLick?: () => void
    open: boolean
    handleOpen: () => void
}

const AlertDialogBox = ({
    children,
    classname,
    description,
    loading,
    onCLick,
    open,
    handleOpen
}: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={handleOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolurely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
                <Button
                    variant={'destructive'}
                    className={`${classname}`}
                    onClick={onCLick}
                >
                    {loading ?
                        <>
                            <Loader2 className='animate-spin' />
                            Loading...
                        </> : 'Continue'}
                </Button>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogBox