const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const ssrfRouter = require('./routes/ssrf');

const app = express();
const PORT = 5000;



app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/owasp-demo').then(() => console.log('MongoDB connected')).catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api', adminRoutes);
app.use('/api/ssrf', ssrfRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
