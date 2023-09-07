'use client'

import styles from './page.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
export default function Home() {

    const router = useRouter()

    const goToAddTask = () => {
        router.push("/addTaskList");
    }

    const goToTaskList = () => {
        router.push("/taskList");
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.center}>
                    <Button variant="contained" sx={{marginRight: '8px'}}startIcon={<AddIcon />} onClick={goToAddTask}>Créer une liste</Button>
                    <Button variant="contained" startIcon={<VisibilityIcon />} onClick={goToTaskList}>Afficher une liste</Button>
                </div>
            </main>
        </>

    )
}
