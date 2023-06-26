/* excluir isso */

const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const caregivers = [
    {
      "idCuidador": 1,
      "descricao": "Trabalho no período diurno, sou ignorante e macho, trabalho com idosos há 1 anos, moro na cidade de Rio Claro - SP, minhas especialidades são dar cuidar de idosos.",
    }, 
    {
      "idCuidador": 2,
      "descricao": "Trabalho no período integral, sou paciente, trabalho com idosos há 10 anos, moro na cidade de Rio de Janeiro - RJ, minhas especialidades são dar banho e levar para lugares.",
    }, 
    {
      "idCuidador": 3,
      "descricao": "Trabalho no período noturno, sou gente boa e mulher, trabalho com idosos há 15 anos, moro na cidade de São Paulo - SP, tenho experiência como enfermeira.",
    }, 
    {
      "idCuidador": 4,
      "descricao": "Trabalho no período noturno, sou paciente e mulher, sou iniciante no ramo, moro no Brasil.",
    }, 
    {
      "idCuidador": 5,
      "descricao": "Trabalho no período noturno, sou um pouco nervoso, trabalho com idosos há 10 anos, moro na cidade de Ouro Preto - MG, minhas especialidades são dar banho, levar para lugares, dar remédios, tenho experiência como enfermeira. ",
    },
    {
        "idCuidador": 6,
        "descricao": "Disponível nos finais de semana, sou responsável e dedicado, trabalho com idosos há 5 anos, moro na cidade de Vitória - ES, minhas especialidades envolvem cuidados com a pele, auxílio na fisioterapia e suporte na organização do ambiente."
    },
    {
        "idCuidador": 7,
        "descricao": "Trabalho em tempo integral, sou carinhoso e atento, trabalho com idosos há 9 anos, moro na cidade de Belém - PA, minhas especialidades incluem cuidados de higiene, administração de medicamentos e auxílio nas atividades de lazer."
    },
    {
        "idCuidador": 8,
        "descricao": "Tenho disponibilidade noturna, sou paciente e prestativo, trabalho com idosos há 1 ano, moro na cidade de Porto Velho - RO, minhas especialidades abrangem auxílio na locomoção, suporte nas terapias ocupacionais e acompanhamento em consultas médicas."
    },
    {
        "idCuidador": 9,
        "descricao": "Disponível nos períodos da tarde e noite, sou empático e cuidadoso, trabalho com idosos há 7 anos, moro na cidade de São Luís - MA, minhas especialidades incluem cuidados com a medicação, auxílio na alimentação e suporte emocional."
    },
    {
        "idCuidador": 10,
        "descricao": "Trabalho no período noturno, sou paciente, trabalho com idosos há 6 anos, moro na cidade de Maceió - AL, minhas especialidades são dar banho, levar para lugares, dar remédios, tenho experiência como enfermeira."
    },
    {
        "idCuidador": 11,
        "descricao": "Trabalho em período integral, sou atencioso, tenho experiência de 5 anos com idosos, moro na cidade de Aracaju - SE, minhas especialidades são cuidados de higiene, acompanhamento em consultas médicas e administração de medicamentos."
    },
    {
        "idCuidador": 12,
        "descricao": "Disponível nos períodos da manhã e tarde, sou dedicado, trabalho com idosos há 3 anos, moro na cidade de Teresina - PI, minhas especialidades incluem auxílio na mobilidade, preparação de refeições saudáveis e suporte emocional."
    },
    {
        "idCuidador": 13,
        "descricao": "Tenho disponibilidade noturna, sou calmo e empático, trabalho com idosos há 7 anos, moro na cidade de João Pessoa - PB, minhas especialidades abrangem cuidados paliativos, auxílio na terapia ocupacional e acompanhamento em atividades físicas."
    },
    {
        "idCuidador": 14,
        "descricao": "Trabalho em meio período, sou atenciosa e paciente, trabalho com idosos há 9 anos, moro na cidade de Natal - RN, minhas especialidades incluem auxílio na alimentação, administração de medicamentos e suporte nas tarefas diárias."
    },
    {
        "idCuidador": 15,
        "descricao": "Disponível nos finais de semana, sou responsável e dedicado, trabalho com idosos há 2 anos, moro na cidade de Cuiabá - MT, minhas especialidades envolvem cuidados com a pele, auxílio na fisioterapia e suporte na organização do ambiente."
    },
    {
        "idCuidador": 16,
        "descricao": "Trabalho em tempo integral, sou carinhoso e atento, trabalho com idosos há 5 anos, moro na cidade de Campo Grande - MS, minhas especialidades incluem cuidados de higiene, administração de medicamentos e auxílio nas atividades de lazer."
    }, 
  ]

app.post("/find-caregivers", async (req, res) => {
    try {
      const { prompt } = req.body.prompt;
      
      console.log(`Prompt ${req.body.prompt}`)
      console.log(`Teste ${req.body.caregivers}`)
      console.log(`Teste ${req.body.limit}`)
      
      /*let fullPrompt = "Sugira sempre 5 melhores cuidadores de acordo com as necessidades inseridas, priorize cuidadores com a mesma localização do paciente\n\n";
      //caregiversData =+ caregivers.map((caregiver) => `${caregiver.idCuidador}: ${caregiver.descricao}`);
      caregivers.forEach((caregiver) => {
          fullPrompt += `ID do Cuidador:${caregiver.idCuidador}\nDescrição:${caregiver.descricao}\n\n`;
      });
      //fullPrompt = `${prompt}\n${caregiversData.join("\n")}`;
      fullPrompt += `Mensagem do cliente:${prompt}\n\n`;
      fullPrompt += "IDS:";

      console.log(fullPrompt);
      
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: fullPrompt,
        temperature: 0,
        //max_tokens: 60,
        //top_p: 1.0,
        //frequency_penalty: 0.8,
        //presence_penalty: 0.0,
        //stop: ["\n"],
      });*/

      return res.status(200).json({
        success: true,
        data: null,//response.data.choices[0].text,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response
          ? error.response.data
          : "There was an issue on the server",
      });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
