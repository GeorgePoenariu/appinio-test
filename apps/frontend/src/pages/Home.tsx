import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { api } from '../services';
import { IApiError, ISummarization } from '../util/interface';
import { handleApiError } from '../util';

const Home = () => {
  const [article, setArticle] = useState('');
  const [summarizations, setSummarizations] = useState<ISummarization[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/user/check-auth');
        if (response.data.authenticated) {
          await fetchSummarizations();
        } else {
          navigate('/login');
        }
      } catch (apiError) {
        console.error('Error checking authentication:', apiError);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSummarization = async () => {
    try {
      await api.post('/summarization', { article });
      setArticle('');
      fetchSummarizations();
    } catch (apiError) {
      const error = handleApiError(apiError as IApiError);
      setError(error);
      console.error('Error submitting summarization:', apiError);
    }
  };

  const fetchSummarizations = async () => {
    try {
      const response = await api.get('/summarization');
      setSummarizations(response.data);
    } catch (apiError) {
      console.error('Error fetching summarizations:', apiError);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      navigate('/login');
    } catch (apiError) {
      console.error('Error logging out:', apiError);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Home
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 4 }}>
        {/* Input field for adding new article */}
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          label="Enter a large text"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Display API error */}
        {error && (
          <Typography variant="body2" color="error" align="left" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Button to submit summarization */}
        <Button variant="contained" onClick={handleSummarization} sx={{ mb: 2 }}>
          Submit Summarization
        </Button>

        {/* Display summarizations */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Summarizations
        </Typography>
        {summarizations.map((item, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Timestamp:{' '}
                <Typography component="span" sx={{ fontWeight: 'normal' }}>
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Article:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', mb: 2 }}
                >
                  {item.article}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Summary:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {item.summary}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Insights:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', mb: 2 }}
                >
                  {item.insights.map((insight: string, insightIndex: number) => (
                    <span key={insightIndex}>
                      {insight}
                      <br />
                    </span>
                  ))}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
