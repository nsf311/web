import http from "../http-commom";
class boston311Service{
    get(id){
        return http.get(`/hex_data/${id}`);

    }
    findByHexNum(hexNum){
        return http.get(`/hex_data/hex_num/${hexNum}`);
    }

    findByUserTypeFreq(user_type, frequency){
        return http.get(`/hex_data/reg_res_user_freq/${user_type}/${frequency}`);
    }

    findAll(){
        return http.get(`/hex_data/all_reg_res`);
    }
}

export default new boston311Service();
