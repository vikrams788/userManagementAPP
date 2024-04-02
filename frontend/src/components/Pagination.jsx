import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName="flex justify-center mt-4"
            pageClassName="mx-1"
            pageLinkClassName="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-full transition duration-150 ease-in-out hover:bg-gray-200"
            activeClassName="bg-blue-500 rounded-md text-white"
            previousClassName="mr-2"
            nextClassName="ml-2"
            previousLabel="Previous"
            nextLabel="Next"
            breakClassName="flex items-center mx-2 text-gray-500"
            breakLinkClassName="px-3 py-2"
            disabledClassName="opacity-50 cursor-not-allowed"
        />
    );
};

export default Pagination;