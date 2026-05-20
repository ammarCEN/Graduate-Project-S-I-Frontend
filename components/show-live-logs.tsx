'use client';

import { Button } from './ui/button'
import { TbClipboardText } from "react-icons/tb";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import LiveLogger from './live-log';
import useConnection from '@/app/providers/api-provider';
import { MdClearAll } from "react-icons/md";


const ShowLiveLogs = () => {
  const { clearLogs } = useConnection();
  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>
          <TbClipboardText />
          System logs
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle> System Live Logger </DialogTitle>
          <DialogDescription>
            Here you can show all logs returned from robot.
          </DialogDescription>
        </DialogHeader>

        <LiveLogger />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant='outline'>
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant='destructive' onClick={clearLogs}>
            <MdClearAll />
            Clear logs
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ShowLiveLogs