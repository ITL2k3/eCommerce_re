class BaseRepository {
    constructor({ Model }){
       
        this.Model =  Model ? Model : null;
    }

    getById(id){
        return this.Model.findById(id);
    }

    getAll(conditions={}){
        return this.Model.find(conditions).limit(10000);
    }

    getList({ offset, sort, limit }){
        // var limit = opt && opt.limit ? opt.limit : this.paging['limit'];
        // var offset = opt && opt.page ? (opt.page - 1) * limit : this.paging['offset'];
        // var sort = opt && opt.sort ? opt.sort : this.sort;
        return this.Model.find().skip(offset).sort(sort).limit(limit);
    }

    getListByConditions({ conditions = {} , offset = 0 , sort ={ createdOn : -1 }, limit = 20 }){
        return this.Model.find(conditions).skip(offset).sort(sort).limit(limit);
    }

    getOneByConditions(conditions){
        return this.Model.findOne(conditions)
    }
    
    deleteOneById(id){
        return this.Model.findByIdAndDelete({ _id: id });
    }

    create(data){ return this.Model.create(data); }

    save(data){ return (new this.Model(data)).save(); }

    updateOneByCondition(filter, update, opt) {
        return this.Model.updateOne(filter, update, opt);
    }

    getOneAndUpdateById(id, update, options = {upsert: false, new : true}) {
        return this.Model.findByIdAndUpdate({ _id: id }, update, options);
    }

    getOneAndUpdateByConditions(conditions, update, options= { upsert: false, new : true} ){
        return this.Model.findOneAndUpdate(conditions, update, options);
    }

    countByConditions(filter){
        return this.Model.countDocuments(filter)
    }

    countAll(){
        return this.Model.estimatedDocumentCount();
    }
}

module.exports = BaseRepository