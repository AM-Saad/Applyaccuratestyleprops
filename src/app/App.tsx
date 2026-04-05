import { useState } from 'react';
import { BiWrapper } from './components/BiWrapper';
import { Sidebar } from './components/Sidebar';
import { AddClientDialog } from './components/AddClientDialog';

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <div className="relative w-full h-screen bg-[#f4f5f7]">
      <Sidebar />
      <div className="pl-[280px] h-full">
        <BiWrapper />
      </div>
      <AddClientDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
