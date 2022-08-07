class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //removing some fiels for category
        const removeFields = ['keyword', 'page', 'limit'];

        removeFields.forEach(field => {
            delete queryCopy[field]
        })

        // this.query = this.query.find({ category: { $regex: queryCopy.category, $options: 'i' } });
        // this.query = this.query.find({ ...queryCopy });

        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (exp) => `$${exp}`)

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currPage = Number(this.queryStr.page) || 1;

        const skip = (currPage - 1) * resultPerPage;

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;