import { renderSettings } from './ui/renderSettings.js';

const app = document.createElement('div');
app.id = 'app';

app.append(renderSettings());

document.body.prepend(app);
