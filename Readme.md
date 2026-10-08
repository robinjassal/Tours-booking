fields limiting:
http://localhost:3000/api/v1/tours?fields=-name,-price

sorting:
http://localhost:3000/api/v1/tours?sort=price

advanced filtering:
http://localhost:3000/api/v1/tours?difficulty=easy&duration[gte]=5&price[lt]=1900

pagination:
http://localhost:3000/api/v1/tours?difficulty=easy&duration[gte]=5&price[lt]=1900

# less optimised code

const getAllTours = async (req, res) => {
try {
// const tours = await Tour.find()
// .where('duration')
// .equals(5)
// .where('difficulty')
// .equals('easy');

    //Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advance Filtering

    //{difficulty:'easy',duration:{$gte:5}}
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);

    let query = Tour.find(JSON.parse(queryStr));

    //Sorting:
    if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    //sort('price ratingsAverage')
    } else {
    query = query.sort('-createdAt');
    }

    //Field limiting
    if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' '); //give us whatever we wrote in query name duration price
    query = query.select(fields);
    } else {
    query = query.select('-__v');
    }

    //Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page=2&limit=10  1-10, page 1 , 11-20 , page 2 , 21-30 page 3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) {
        // throw new Error('this page does not exist');
        res.status(400).json({
        status: 'error',
        results: 'This page doest not exist',
        });
    }
    }
    const tours = await query;
    res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
        tours: tours,
    },
    });

    } catch (error) {
    console.log(error);
    res.status(400).json({
    status: 'fail',
    message: error,
    });
    }
    };
