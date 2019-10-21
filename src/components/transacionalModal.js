import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {useDropzone} from 'react-dropzone'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div style={{ border: "2px dashed darkgrey", padding: '16px', borderRadius: '8px', width: '100%' }} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: '24px',
    margin: theme.spacing(1),
    width: '100px'
  },
  input: {
    display: 'none',
  },
  textField: {
  },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

export default function TransitionsModal() {
  const classes = useStyles();
  const [idMethod, setIdMethod] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    phonenumber: '',
    address: '',
    country: 'Dominican Republic',
  });
  const data = useStaticQuery(graphql`
  query {
    idCard: file(relativePath: { eq: "id-card.png" }) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    passport: file(relativePath: { eq: "passport.png" }) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    diverLicense: file(relativePath: { eq: "driver-license.png" }) {
      childImageSharp {
        fluid(maxWidth: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
        Submit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div style={{fontSize: '24px', fontWeight: 500}}>Submit your data</div>
            <TextField
                id="standard-name"
                label="Complete name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
            />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="formatted-text-mask-input">Phone number</InputLabel>
                <Input
                    className={classes.textField}
                    value={values.phonenumber}
                    onChange={handleChange('phonenumber')}
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom}
                />
            </FormControl>
            <TextField
                id="standard-multiline-flexible"
                label="Address"
                multiline
                rowsMax="4"
                value={values.address}
                onChange={handleChange('address')}
                className={classes.textField}
                margin="normal"
            />
            <TextField
                id="standard-country"
                label="Country"
                className={classes.textField}
                value={values.country}
                onChange={handleChange('country')}
                margin="normal"
            />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '16px'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontWeight: 600, padding: '8px', borderRadius: '8px', margin: '8px'}}><Img fluid={data.idCard.childImageSharp.fluid} style={{width: '80px'}} />Id</div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontWeight: 600, padding: '8px', borderRadius: '8px', margin: '8px'}}><Img fluid={data.passport.childImageSharp.fluid} style={{width: '80px'}} />Passport</div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontWeight: 600, padding: '8px', borderRadius: '8px', margin: '8px'}}><Img fluid={data.diverLicense.childImageSharp.fluid} style={{width: '80px'}} />Driver license</div>
            </div>
            <MyDropzone/>
            <Button variant="contained" color="primary" className={classes.button}>
                Send
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}