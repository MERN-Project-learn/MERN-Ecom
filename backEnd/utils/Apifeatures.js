class Apifeatures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }
    search(){
        const keyword = this.querystr.keyword?{
            name:{
                $regex :this.querystr.keyword,
                $options:"i",
            },
        }:{};
        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        const querycopy = {...this.querystr};
        //remove some field for category
        const removefileds = ['keyword','page','limit'];

        removefileds.forEach((key)=>delete querycopy[key]);

        //filer price or rating
        let querystr = JSON.stringify(querycopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
        this.query = this.query.find(JSON.parse(querystr));
        return this;

    }

    pagination(resultperpage){
        const currentpage = Number(this.querystr.page)|| 1;

        const skip = resultperpage * (currentpage - 1);

        this.query =this.query.limit(resultperpage).skip(skip);

        return this;

    }
};

module.exports = Apifeatures;