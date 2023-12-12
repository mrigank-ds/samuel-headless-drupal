// pages/api/products.js
export default async function handler(req, res) {
    let url;
    if(req.body.locale != 'en'){
        url = `http://localhost/New-Headless-Drupal-Website/d-9.5.11/install-dir/web/${req.body.locale}/jsonapi/node/products`;
    }else{
        url = `http://localhost/New-Headless-Drupal-Website/d-9.5.11/install-dir/web/jsonapi/node/products`;
    }
    try {
      const apiEndpoint = url;
      const apiResponse = await fetch(apiEndpoint);
      const data = await apiResponse.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  