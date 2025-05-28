import os
from flask import Flask, render_template, request, jsonify
from PIL import Image
from io import BytesIO
from google import genai
from google.genai import types

app = Flask(__name__)

API_KEY = "AIzaSyDWESm9jdBQhY1_GY9FiTYBuLz7MfL1wio"
client = genai.Client(api_key=API_KEY)

# 스타일 코드별 영어 프롬프트
STYLE_PROMPTS = {
    "enhance": "Please enhance the quality of this image and make it look more realistic and detailed.",
    "watercolor": "Please turn this image into a beautiful watercolor-style painting.",
    "oil": "Please turn this image into art that looks like a realistic oil painting, using rich brush strokes and texture.",
    "digital": "Please recreate this image as vibrant and modern digital art, keeping it detailed and eye-catching."
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enhance', methods=['POST'])
def enhance():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': '이미지 파일이 없습니다.'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': '파일이 선택되지 않았습니다.'})

    # 스타일 정보 수신
    style = request.form.get('style', 'enhance')
    prompt = STYLE_PROMPTS.get(style, STYLE_PROMPTS['enhance'])

    # PIL 이미지 변환
    try:
        image = Image.open(file.stream)
    except Exception as e:
        return jsonify({'success': False, 'message': '이미지 파일을 읽는 중 오류가 발생했습니다.'})

    # Gemini API 호출
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-preview-image-generation",
            contents=[prompt, image],
            config=types.GenerateContentConfig(response_modalities=['TEXT', 'IMAGE'])
        )

        enhanced_image_bytes = None
        enhanced_text = None
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'text') and part.text:
                enhanced_text = part.text
            if hasattr(part, 'inline_data') and part.inline_data and part.inline_data.data:
                enhanced_image_bytes = part.inline_data.data

        if enhanced_image_bytes:
            buf = BytesIO(enhanced_image_bytes)
            buf.seek(0)
            # 파일명에 랜덤/타임스탬프 추가 추천(동접 방지)
            result_filename = f'result_{style}_{int.from_bytes(os.urandom(4), "big")}.png'
            result_path = os.path.join('static', result_filename)
            with open(result_path, 'wb') as f:
                f.write(buf.read())
            return jsonify({
                'success': True,
                'result_url': f'/static/{result_filename}',
                'message': enhanced_text or '이미지 변환 완료'
            })
        else:
            return jsonify({'success': False, 'message': 'AI 변환 결과가 없습니다.'})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': f'AI 변환 중 오류가 발생하였습니다. ({str(e)})'})

if __name__ == '__main__':
    if not os.path.exists('static'):
        os.makedirs('static')
    app.run(debug=True)
