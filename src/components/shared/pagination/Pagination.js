import ReactPaginate from "react-paginate";
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from  'react-icons/bs'
import classes from './pagination.module.css'
function Pagination(props) {
    return ( 
        <ReactPaginate
				previousLabel={<BsFillArrowLeftCircleFill/>}
				nextLabel={<BsFillArrowRightCircleFill/>}
				breakLabel={"..."}
				pageCount={Math.ceil(props.totalPages)}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={props.onPageChange}
				containerClassName={`${classes.paginationContainer} pagination justify-content-center `}
				pageClassName={`page-item px-2 py-1`}
				pageLinkClassName={`page-link ${classes.pageLink}`}
				previousClassName={"page-item"}
				previousLinkClassName={`page-link ${classes.pageItem}`}
				nextClassName={"page-item"}
				nextLinkClassName={`page-link ${classes.pageItem}`}
				breakClassName={"page-item"}
				breakLinkClassName={"page-link"}
				activeClassName={`${classes.active}`}
			/>
     );
}

export default Pagination;