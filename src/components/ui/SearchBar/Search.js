import React from 'react';
import './Search.css'; 

const SearchSVG = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-svg-icon">
        <path d="M24.0202 24.0199L33.3333 33.333" stroke="black" strokeLinecap="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 26.667C22.1895 26.667 26.6667 22.1898 26.6667 16.667C26.6667 11.1441 22.1895 6.66699 16.6667 6.66699C11.1438 6.66699 6.66666 11.1441 6.66666 16.667C6.66666 22.1898 11.1438 26.667 16.6667 26.667Z" stroke="black"/>
    </svg>
);

const FilterSVG = () => (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter-svg-icon">
        <path d="M17.7917 2.13477L18.1781 2.45219L18.1781 2.45218L17.7917 2.13477ZM11.4246 9.88379L11.0382 9.56636C10.9647 9.65582 10.9246 9.76801 10.9246 9.88379H11.4246ZM11.4246 15.1309L11.729 15.5275C11.8523 15.4328 11.9246 15.2863 11.9246 15.1309H11.4246ZM7.03589 18.5H6.53589C6.53589 18.6904 6.64402 18.8643 6.8148 18.9485C6.98557 19.0327 7.18933 19.0125 7.34036 18.8966L7.03589 18.5ZM7.03589 9.80957H7.53589C7.53589 9.69380 7.49571 9.58161 7.42222 9.49216L7.03589 9.80957ZM0.730225 2.13477L1.11655 1.81736L1.11655 1.81735L0.730225 2.13477ZM1.50269 0.5V1V0.5ZM17.0193 0.5V1C17.4414 1 17.6736 1.49095 17.4054 1.81735L17.7917 2.13477L18.1781 2.45218C18.9822 1.47344 18.2863 0 17.0193 0V0.5ZM17.7917 2.13477L17.4054 1.81734L11.0382 9.56636L11.4246 9.88379L11.8109 10.2012L18.1781 2.45219L17.7917 2.13477ZM11.4246 9.88379H10.9246V15.1309H11.4246H11.9246V9.88379H11.4246ZM11.4246 15.1309L11.1201 14.7343L6.73142 18.1034L7.03589 18.5L7.34036 18.8966L11.729 15.5275L11.4246 15.1309ZM7.03589 18.5H7.53589V9.80957H7.03589H6.53589V18.5H7.03589ZM7.03589 9.80957L7.42222 9.49216L1.11655 1.81736L0.730225 2.13477L0.343895 2.45218L6.64956 10.127L7.03589 9.80957ZM0.730225 2.13477L1.11655 1.81735C0.848365 1.49095 1.08054 1 1.50269 1V0.5V0C0.235649 0 -0.46027 1.47344 0.343901 2.45218L0.730225 2.13477ZM1.50269 0.5V1H17.0193V0.5V0H1.50269V0.5Z" fill="black"/>
    </svg>
);


const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Pesquisar...", onFilterClick }) => {
    return (
        <div className="search-filter-container"> {/* Novo container pai para ambos os elementos */}
            <div className="search-box">
                <input 
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <SearchSVG />
            </div>
            
            {/* Ícone de Filtro Integrado */}
           
        </div>
    );
};

export default SearchBar;