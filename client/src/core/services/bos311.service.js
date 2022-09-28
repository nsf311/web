import http from "../../http-commom";
class boston311Service{
    get(id){
        return http.get(`/hex_data/${id}`);

    }
    findByHexNum(hexNum){
        return http.get(`/hex_data/hex_num/${hexNum}`);
    }

    findHexVarByFilter(hexNum, user_type, frequency, reason){
        return http.get(`/hex_data/hex_vars_filtered/${hexNum}/${user_type}/${frequency}/${reason}`);
    }

    findRegVarByFilter(user_type, frequency,reason){
        return http.get(`/hex_data/reg_res_filtered/${user_type}/${frequency}/${reason}`);
    }

    findAll(){
        return http.get(`/hex_data/all_reg_res`);
    }
}

export default new boston311Service();
