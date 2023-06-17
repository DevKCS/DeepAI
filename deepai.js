import FormData from 'form-data';
import axios from 'axios';
import { load } from 'cheerio';
import { randomBytes, randomUUID } from "crypto";
class DeepAI {
    /**
     * @returns 대충 GA1.2값 생성
     */
    genGA() {
        return `GA1.2.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Math.random() * 10000000000)}`;
    }
    /**
     * @param {Number} n 생성할 난문의 길이 
     * @returns 생성된 난문
     */
    generateRandomString = (n) => {
        return randomBytes(21).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substr(0, n);
    };

    /**
     * @returns DeepAI ApiKey
     */
    async getKey() {
        var e = Math.round(1E11 * Math.random()) + "", g, f;
        var ua =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36';
        let response = await axios.get('https://deepai.org/machine-learning-model/waifu2x');
        const $ = load(response.data);
        let data = $("script").get()[10].children[0].data.replace(/\n/gi, '');
        eval(
            data
                .slice(data.indexOf(`.classList.add("disabled"),`) + 27, data.indexOf(`,deepai.setApiKey(f)`))
                .replaceAll("navigator.userAgent", `"${ua}"`)
                .replaceAll("+e+", `+"${e}"+`)
        );
        return f;
    }

    /**
     * @param {String} link Image Url
     * @returns {String} Upscaled Image Url
     * @description 이미지를 업스케일(2x)한다. (애니 그림체에 최적화?)
     */
    async waifu2x(link) {
        const form = new FormData();
        form.append('image', link);
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Api-Key': await this.getKey(),
            'client-library': 'deepai-js-client',
            'Cookie': `_ga=${this.genGA()}; _gid=${this.genGA()}; cookie=${randomUUID()}; user_sees_ads=true;`,
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'origin': 'https://deepai.org',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        };
        let response = await axios.post('https://api.deepai.org/api/waifu2x', form, {
            headers: headers,
        });
        return response.data.output_url;
    }

    /**
     * @param {String} link Image Url
     * @returns {String} Upscaled Image Url
     * @description 이미지를 업스케일(4.5x)한다.
     */
    async upscale(link) {
        const form = new FormData();
        form.append('image', link);
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Api-Key': await this.getKey(),
            'client-library': 'deepai-js-client',
            'Cookie': `_ga=${this.genGA()}; _gid=${this.genGA()}; cookie=${randomUUID()}; user_sees_ads=true;`,
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'origin': 'https://deepai.org',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        };
        let response = await axios.post('https://api.deepai.org/api/torch-srgan', form, {
            headers: headers,
        });
        return response.data.output_url;
    }

    /**
     * @param {String} link Image Url
     * @returns {String} Colorized Image Url
     * @description 이미지를 채색한다.
     */
    async colorizer(link) {
        const form = new FormData();
        form.append('image', link);
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Api-Key': await this.getKey(),
            'client-library': 'deepai-js-client',
            'Cookie': `_ga=${this.genGA()}; _gid=${this.genGA()}; cookie=${randomUUID()}; user_sees_ads=true;`,
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'origin': 'https://deepai.org',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        };
        let response = await axios.post('https://api.deepai.org/api/colorizer', form, {
            headers: headers,
        });
        return response.data.output_url;
    }

    /**
     * @param {String} link Image Url
     * @returns {Number} Nsfw percentage
     * @description 이미지의 nsfw를 측정한다.
     */
    async nsfw(link) {
        const form = new FormData();
        form.append('image', link);
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Api-Key': await this.getKey(),
            'client-library': 'deepai-js-client',
            'Cookie': `_ga=${this.genGA()}; _gid=${this.genGA()}; cookie=${randomUUID()}; user_sees_ads=true;`,
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'origin': 'https://deepai.org',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        };
        let response = await axios.post('https://api.deepai.org/api/nsfw-detector', form, {
            headers: headers,
        });
        return response.data.output.nsfw_score;
    }

    /**
     * @param {String} prompt 생성할 이미지의 프롬프트
     * @param {Number} width 512 ~ 1024 (64x)
     * @param {Number} height 512 ~ 1024 (64x)
     * @returns {String} 생성된 이미지의 링크
     * @description 입력된 프롬프트와 이미지 크기를 바탕으로 이미지를 생성한다. (StableDiffusion)
     */
    async art(prompt, width, height) {
        const form = new FormData();
        form.append('text', prompt);
        form.append('width', width);
        form.append('height', height);
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Api-Key': await this.getKey(),
            'client-library': 'deepai-js-client',
            'Cookie': `_ga=${this.genGA()}; _gid=${this.genGA()}; cookie=${randomUUID()}; user_sees_ads=true;`,
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'origin': 'https://deepai.org',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        };
        let response = await axios.post('https://api.deepai.org/api/stable-diffusion', form, {
            headers: headers,
        });
        return response.data.output_url;
    }
}


let deepai = new DeepAI()
//console.log(await deepai.nsfw('https://static.molya.kr/static/0ef42a42eda444d393a6b731e5106c0e.webp'))
//console.log(await deepai.colorizer('https://static.molya.kr/static/0ef42a42eda444d393a6b731e5106c0e.webp'))
//console.log(await deepai.waifu2x('https://static.molya.kr/static/0ef42a42eda444d393a6b731e5106c0e.webp'))
//console.log(await deepai.upscale('https://static.molya.kr/static/0ef42a42eda444d393a6b731e5106c0e.webp'))
//console.log(await deepai.art('a white cat',1024,1024))

