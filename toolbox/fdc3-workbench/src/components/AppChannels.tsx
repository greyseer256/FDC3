import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, IconButton, Tooltip, Typography, Grid, TextField, FormHelperText } from "@material-ui/core";
import { observer } from "mobx-react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import contextStore from "../store/ContextStore";
import appChannelStore from "../store/AppChannelStore";
import intentStore from "../store/IntentStore";
import { codeExamples } from "../fixtures/codeExamples";
import { TemplateTextField } from "./common/TemplateTextField";
import { copyToClipboard } from "./common/CopyToClipboard";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		title: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		form: {
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			marginTop: theme.spacing(1),
			"& > *": {
				margin: theme.spacing(1),
				marginLeft: "0px",
			},
		},
		controls: {
			"& > *:first-child": {
				marginLeft: 0,
			},
			"& > *": {
				marginRight: theme.spacing(1),
			},
			"& > *:last-child": {
				marginRight: 0,
			},
			"& .MuiIconButton-sizeSmall": {
				padding: "6px",
			},
		},
		rightAlign: {
			flexDirection: "row",
			justifyContent: "flex-end",
		},
		spread: {
			flexDirection: "row",
			"& > *:first-child": {
				paddingLeft: "0px",
			},
		},
		textField: {
			width: "100%",
			"& input": {
				height: "29px",
				padding: "6px",
			},
		},
		h4: {
			fontSize: "22px",
		},
		field: {
			flexGrow: 1,
			marginRight: theme.spacing(1),
			minWidth: "190px",
		},
		border: {
			height: "1px",
			width: "100%",
			backgroundColor: "#acb2c0",
			marginTop: "24px",
			marginBottom: "16px",
		},
	})
);

export const AppChannels = observer(({handleTabChange} : {handleTabChange:any}) => {
    const classes = useStyles();
    const [isError, setIsError] = useState<boolean>(false)
    const [currentAppChannelId, setCurrentAppChannelId] = useState<string>("")

    const handleGetorCreateChannel = () =>{
        debugger;
        if (currentAppChannelId) {
           appChannelStore.getOrCreateChannel(currentAppChannelId);
           setCurrentAppChannelId("");
        }

    };

    const handleChannelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrentAppChannelId(event.target.value as string);
    };

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
				<Typography variant="h5">Get Channel</Typography>
			</Grid>

            <form className={classes.form} noValidate autoComplete="off">
                <Grid container direction="row" spacing={1}>
                    <Grid item className={classes.field}>
                        <TextField 
                            fullWidth 
                            variant="outlined" 
                            label="Channel Name" 
                            type="text" 
                            size="small" 
                            onChange={handleChannelChange}
                        />
                        {isError && <FormHelperText>Input app channel</FormHelperText>}
                    </Grid>
                    <Grid item className={classes.controls}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGetorCreateChannel}
                            disabled={!currentAppChannelId}
                        >
                            Get or Create Channel
                        </Button>
                    </Grid>
                </Grid>
        </form>
        </div>
    );
});