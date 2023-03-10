//Main Branch
import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useStoreActions, useStoreState } from "easy-peasy";
import Stack from "./Stack";

const StackBrowser = () => {
    const stacks = useStoreState((state) => state.stacks);
    const newStack = useStoreActions(actions => actions.newStack);

    return (
        <Box height="100vh" backgroundColor="#f4f5f9" borderRight="0.06rem solid #adadad">
            <Box height="4.5rem" backgroundColor="#fff" py="0.5rem" display="flex" alignItems="center" justifyContent="center" borderBottom="0.06rem solid #adadad">   {/* height="4.5rem" */}
                <Typography variant="h2" fontSize="1.1rem" fontWeight="600" color="black">Card Browser</Typography>
            </Box>

            <Box onClick={newStack} backgroundColor="#fff" mx="1.5rem" my="1.5rem" sx={{ boxShadow: 2 }} height="3rem" borderRadius="0.6rem" display="flex" justifyContent="center" alignItems="center">   {/* mx="1.5rem" */}
                <Box display="flex" alignItems="center">
                    <AddCircleOutlineIcon sx={{ color:"#909090"}}/>
                    <Typography variant="h5" fontWeight="625" color="#909090" ml="0.5rem">Add new Stack</Typography>
                </Box>
            </Box>
            {stacks && stacks.map((stack, i) => (
                <Stack key={i} title={stack.name} color={stack.color} cards={stack.cards} id={i + 1}/>
            ))}
        </Box>
    );
}
 
export default StackBrowser;