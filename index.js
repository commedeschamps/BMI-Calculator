const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const BMI_BUCKETS = [
    { max: 18.5, label: 'Underweight', color: '#6495ed' },
    { max: 25, label: 'Normal', color: '#2e8b57' },
    { max: 30, label: 'Overweight', color: '#ff8c00' },
    { max: Infinity, label: 'Obese', color: '#dc143c' },
];

function categorizeBmi(bmi) {
    const bucket = BMI_BUCKETS.find(range => bmi < range.max);
    return bucket ?? { label: 'Unknown', color: '#808080' };
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    const invalidInput =
        Number.isNaN(weight) ||
        Number.isNaN(height) ||
        weight <= 0 ||
        height <= 0 ||
        weight > 500 ||
        height > 300;

    if (invalidInput) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Error</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="/styles.css" />
                </head>
                <body>
                    <div class="container">
                        <h1>Error</h1>
                        <div class="result" style="background-color:#dc143c; color: white;">
                            <p>Please enter valid weight and height values.</p>
                        </div>
                        <a href="/" class="back-link">Try Again</a>
                    </div>
                </body>
            </html>
        `);
    }

    const bmi = weight / ((height / 100) ** 2);
    const { label, color } = categorizeBmi(bmi);
    

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BMI Result</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <div class="container">
                    <h1>BMI Result</h1>
                    <div class="result" style="background-color:${color}; color: white;">
                        <h2>${bmi.toFixed(1)}</h2>
                        <p>${label}</p>
                    </div>
                    <a href="/" class="back-link">Calculate Again</a>
                    
                    <div class="bmi-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>BMI</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Below 18.5</td>
                                    <td class="underweight">Underweight</td>
                                </tr>
                                <tr>
                                    <td>18.5 – 24.9</td>
                                    <td class="normal">Normal</td>
                                </tr>
                                <tr>
                                    <td>25 – 29.9</td>
                                    <td class="overweight">Overweight</td>
                                </tr>
                                <tr>
                                    <td>30 and above</td>
                                    <td class="obese">Obese</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
