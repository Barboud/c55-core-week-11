import dotenv from 'dotenv';
import OpenAI from 'openai';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

dotenv.config();

const apiConnection = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.AZURE_OPENAI_KEY,
});

async function startQuiz() {
  console.log(
    chalk.blue.bold('\n=== Welcome to the AI powered quiz game ===\n'),
  );
  console.log(chalk.yellow('Generating questions from the AI...'));

  const response = await apiConnection.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `
Generate exactly 10 multiple-choice quiz questions about world geography.

Rules:
- Each question must have exactly 4 answer options.
- Only one answer is correct.
- Make the questions clear and suitable for a CLI quiz game.
- Return ONLY valid JSON.
- Do not include markdown code fences.
- Do not include any explanation before or after the JSON.

Use this exact JSON format:
[
  {
    "question": "Which country has the city of Kyoto?",
    "options": ["China", "Japan", "South Korea", "Thailand"],
    "correctAnswer": 2
  }
]

Important:
- "correctAnswer" must be a number from 1 to 4.
- Return exactly 10 question objects.
`,
      },
    ],
  });

  const aiResponseText = response.choices[0].message.content;
  const questions = JSON.parse(aiResponseText);

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const currentQ = questions[i];

    console.log(chalk.cyan(`\nQuestion ${i + 1}: ${currentQ.question}`));

    console.log(`1. ${currentQ.options[0]}`);
    console.log(`2. ${currentQ.options[1]}`);
    console.log(`3. ${currentQ.options[2]}`);
    console.log(`4. ${currentQ.options[3]}`);

    const userChoice = readlineSync.question('\n write your answer (1-4): ');

    if (parseInt(userChoice) === currentQ.correctAnswer) {
      console.log(chalk.green('Your answer is correct! +1 point'));
      score++;
    } else {
      console.log(
        chalk.red(`✖ Wrong! The correct answer is: ${currentQ.correctAnswer}`),
      );
    }
  }

  console.log(chalk.magenta.bold('\n============================'));
  console.log(
    chalk.white(`Quiz finished! Your score is: `) +
      chalk.green.bold(`${score}/10`),
  );
  console.log(chalk.magenta.bold('============================\n'));
}

startQuiz();
