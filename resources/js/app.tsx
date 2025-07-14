import { createRoot } from 'react-dom/client';
import Example from '@/components/Example';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);

    root.render(
        <Example />
    );
}