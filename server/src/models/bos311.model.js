module.exports = mongose =>{
    var schema = mongose.Schema(
        {
            Hex_600: Number,
            HEX_weighted_average_distance: Number,
            HEX_weighted_mean_home_distance: Number,
            HEX_weighted_max_home_distance: Number

        },
        {timestamps: false}
    );

    schema.method("toJson", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const bos311Hex = mongose.model("bos311Hex", schema);
    return bos311Hex;
};