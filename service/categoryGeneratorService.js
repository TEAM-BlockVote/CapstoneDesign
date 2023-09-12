const OpenAI = require("openai");
const fs = require('fs');
const pool = require('../server/Router/pool');

exports.categoryGeneratorService = async (voteCode) => {
  const promiseDummies = [];
  const selectPromise = "select partyNumber, promise from candidates where voteCode = ?;";
  const candidatePromiseData = await new Promise((resolve, reject) => {
    pool.query(selectPromise, [voteCode], (err, results, fields) => {
      if (err) {
        reject(err);
      }
      else
        resolve(results);
    });
  });
  candidatePromiseData.map((ele, index) => {
    const {partyNumber, promise} = ele;
    promise.split(';').map((ele, index) => {
      promiseDummies.push({'candidateNumber': partyNumber, 'promise': ele});
    })
  });
  
  const prompts = promiseDummies.map(item => `후보자 ${item.candidateNumber}이(가) 공약 "${item.promise}"을(를) 내놓았습니다.`);
  
  const fileContents = {};
  const fileNames = ['/user.txt', '/plan.txt', '/examine.txt', '/create.txt'];
  async function readFilesAndAssignContents(fileNames) {
    for (const fileName of fileNames) {
      try {
        const data = await fs.promises.readFile(__dirname + fileName, 'utf8');
        fileContents[fileName] = data;
      } catch (error) {
        console.error('파일 읽기 실패 GPT-service Error', error);
      }
    }
  }
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const generator = async () => {
    try {
      await readFilesAndAssignContents(fileNames);
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `나는 우수한 카테고리 생성자입니다. 특히 선거 공약을 보고 카테고리를 분석하는것에 특화되어 있으며 범용적인 단어를 생성하는 전문가입니다.`,
          },
          {
            role: 'user',
            content: prompts + `${fileContents['/user.txt']}`
          },
          {
            role: 'assistant',
            content: `${fileContents['/plan.txt']}`
          },
          {
            role: 'assistant',
            content: `${fileContents['/examine.txt']}`
          },
          {
            role: 'assistant',
            content: `${fileContents['/create.txt']}`
          },
          {
            role: 'user',
            content: `위 기획, 검토, 생성 단계를 통해 기본적인 예시, 코드, 피드백 등을 제외한 오직 json형태의 객체만 출력하십시오.`
          },
        ],
      });

      let addSql = "INSERT INTO categories (category, candidateNumber, promise, voteCode) VALUES";
      let jsonData = JSON.parse(chatCompletion.choices[0].message.content);
      const categories = Object.keys(jsonData);

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const promises = jsonData[category];
        for (let j = 0; j < promises.length; j++) {
          const { candidateNumber, promise: promiseText } = promises[j];
          addSql += `('${category}', ${candidateNumber}, '${promiseText}', '${voteCode}')`;
          if (i < categories.length - 1 || j < promises.length - 1) {
            addSql += ',';
          };
        };
      };

      await pool.execute(addSql);
      console.log("카테고리 생성 / 디비 저장 완료");
    } catch (err) {
      console.error('디비 저장 에러:', err);
    }
  };
  generator();
  return 0;
};
