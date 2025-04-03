from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import BertTokenizerFast, BertForQuestionAnswering
import json

# Khởi tạo FastAPI
app = FastAPI()

# Load dataset
with open("question_answer.json", "r", encoding="utf-8") as f:
    test_data = json.load(f)

# Load model và tokenizer
model = BertForQuestionAnswering.from_pretrained("./content/trained_model")
tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")

# Định nghĩa schema request
class QuestionRequest(BaseModel):
    question: str

# Hàm hỏi đáp
def chat(question):
    matched_samples = [item for item in test_data if item["question"].lower() == question.lower()]
    
    if not matched_samples:
        return {"error": "Không tìm thấy context phù hợp trong dataset."}
    
    sample = matched_samples[0]
    context = sample["context"]
    
    inputs = tokenizer(question, context, return_tensors="pt", padding=True, truncation=True, max_length=512)
    inputs = inputs.to(model.device)
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    start_scores = outputs.start_logits
    end_scores = outputs.end_logits
    
    start = torch.argmax(start_scores)
    end = torch.argmax(end_scores)
    
    if end < start:
        end = start
    
    answer_tokens = inputs["input_ids"][0][start:end + 1]
    answer = tokenizer.decode(answer_tokens, skip_special_tokens=True)
    
    return {"question": question, "answer": answer}

# API endpoint
@app.post("/chat")
def chatbot_api(data: QuestionRequest):
    response = chat(data.question)
    return response

# Chạy server (chạy lệnh trong terminal, không chạy trực tiếp trong script)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
