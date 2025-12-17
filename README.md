# BMI Calculator

A simple Body Mass Index (BMI) calculator web application built with Node.js and Express.

## Features

- Calculate BMI based on weight (kg) and height (cm)
- Color-coded results for different BMI categories
- Input validation for weight and height
- Clean, responsive UI with modern design

## BMI Categories

| Category | BMI Range |
|----------|-----------|
| Underweight | < 18.5 |
| Normal | 18.5 - 24.9 |
| Overweight | 25 - 29.9 |
| Obese | ≥ 30 |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/commedeschamps/BMI-Calculator.git
   cd BMI-Calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Development

For auto-reload during development, use nodemon:
```bash
npm install -g nodemon
nodemon index.js
```

## Project Structure

```
bmi-app/
├── index.js          # Express server and routes
├── package.json      # Project dependencies
├── public/
│   └── styles.css    # CSS styles
└── views/
    └── index.html    # Main HTML form
```

## Technologies Used

- Node.js
- Express.js
- HTML5
- CSS3 (with Inter font)
- Nodemon

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Renders the BMI calculator form |
| POST | `/calculate-bmi` | Calculates BMI and returns result |

# Deployed on
https://bmi-calculator-rmtz.onrender.com

## License

MIT
