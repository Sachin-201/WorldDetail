// import React, { Component, ChangeEvent } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import withRouter from '../withRouter';

// const formStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   sizeAdjust: 'auto',
//   marginTop: '20px',
// };

// const inputStyle = {
//   padding: '10px',
//   marginBottom: '10px',
//   width: '300px',
//   fontSize: '16px',
// };

// const buttonStyle = {
//   padding: '10px',
//   backgroundColor: '#007bff',
//   color: '#fff',
//   border: 'none',
//   cursor: 'pointer',
//   fontSize: '16px',
// };

// const disabledButtonStyle = {
//   backgroundColor: '#ccc',
//   cursor: 'not-allowed',
// };

// class CountryForm extends Component<any, any> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       country_input: '',
//     };
//   }

//   handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     this.setState({
//       country_input: value.startsWith(' ') ? value.trimStart() : value,
//     });
//   };

  // fetchData = async () => {
  //   const { country_input } = this.state;
  //   const { navigate } = this.props;
  //   const res = await fetch(`https://restcountries.com/v3.1/name/${country_input}?fullText=true`);
  //   const data = await res.json();
  //   if (data.status !== 404) {
  //     navigate(`/${country_input}`, { state: { apiData: data[0] } });
  //   } else {
  //     toast.error('Country not found ');
  //   }
  // };

//   handleSearch = () => {
//     this.fetchData();
//   };

//   handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     this.fetchData();
//   };

//   render() {
//     const { country_input } = this.state;
//     const isSearchDisabled = country_input.length === 0;

//     return (
//       <>
//         <Toaster position="top-center" reverseOrder={false} />
//         <form onSubmit={this.handleSubmit} style={formStyle}>
//           <input
//             type="text"
//             placeholder="Enter Country Name"
//             value={country_input}
//             onChange={this.handleChange}
//             style={inputStyle}
//           />
//           <button
//             type="button"
//             disabled={isSearchDisabled}
//             onClick={this.handleSearch}
//             style={isSearchDisabled ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
//           >
//             Search
//           </button>
//         </form>
//       </>
//     );
//   }
// }

// export default withRouter(CountryForm);





import React, { Component, ChangeEvent, CSSProperties } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import withRouter from '../withRouter';

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
//  sizeAdjust: 'auto',
  marginTop: '20px',
};

const inputStyle: CSSProperties = {
  padding: '10px',
  marginBottom: '10px',
  width: '300px',
  fontSize: '16px',
};

const buttonStyle: CSSProperties = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

const disabledButtonStyle: CSSProperties = {
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

class CountryForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      country_input: '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      country_input: value.startsWith(' ') ? value.trimStart() : value,
    });
  };

  fetchData = async () => {
    const { country_input } = this.state;
    const { navigate } = this.props;
    const res = await fetch(`https://restcountries.com/v3.1/name/${country_input}?fullText=true`);
    const data = await res.json();
    if (data.status !== 404) {
      navigate(`/${country_input}`, { state: { apiData: data[0] } });
    } else {
      toast.error('Country not found ');
    }
  };

  handleSearch = () => {
    this.fetchData();
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.fetchData();
  };

  render() {
    const { country_input } = this.state;
    const isSearchDisabled = country_input.length === 0;

    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={this.handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Enter Country Name"
            aria-label='Enter Country Name'
            value={country_input}
            onChange={this.handleChange}
            style={inputStyle}
          />
          <button
            type="button"
            disabled={isSearchDisabled}
            onClick={this.handleSearch}
            style={isSearchDisabled ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
          >
            Search
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(CountryForm);
