import http from "../http-commom";
class boston311Service{
    get(id){
        return http.get(`/hex_data/${id}`);

    }
    findByHexNum(hexNum){
        return http.get(`/hex_data/hex_num/${hexNum}`);
    }
}

export default new boston311Service();
