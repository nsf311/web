import https from "../../http-commom";
class boston311Service{
    get(id){
        return https.get(`/hex_data/${id}`);

    }
    findByHexNum(hexNum){
        return https.get(`/hex_data/hex_num/${hexNum}`);
    }

    findHexVarByFilter(hexNum, user_type, frequency, reason){
        return https.get(`/hex_data/hex_vars_filtered/${hexNum}/${user_type}/${frequency}/${reason}`);
    }

    findRegVarByFilter(user_type, frequency,reason){
        return https.get(`/hex_data/reg_res_filtered/${user_type}/${frequency}/${reason}`);
    }

    findAll(){
        return https.get(`/hex_data/all_reg_res`);
    }
}

export default new boston311Service();
