module.exports = mongoose =>{
    var schema = mongoose.Schema(
        {
            HEX_600: Number,
            results:[{
                user_type: String,
                frequency: String,
                reason: String,
                HEX_weighted_average_distance: Number,
                HEX_weighted_mean_home_distance: Number,
                HEX_weighted_max_home_distance: Number,
                HEX_weighted_median_home_distance: Number,
                HEX_weighted_radius_of_gyration: Number,
                HEX_weighted_num_reporting_2015: Number,
                HEX_weighted_HEX_coverage: Number,
                HEX_weighted_subject_coverage: Number,
                HEX_weighted_subject_hhi: Number,
                HEX_total_reporting: Number,
                HEX_total_user: Number
            }],
        },
        {timestamps: false}
    );

    schema.method("toJson", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const bos311Hex = mongoose.model('bos311Hex', schema, 'bos311Hex');
    return bos311Hex;
};
