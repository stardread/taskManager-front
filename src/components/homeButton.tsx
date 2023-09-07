import Link from 'next/link';
import Button from '@mui/material/Button';

function HomeButton() {
  return (
    <Link href="/">
      <Button variant="outlined" color="primary">
        Accueil
      </Button>
    </Link>
  );
}

export default HomeButton;
