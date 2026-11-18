const getJobs = async (req, res) => {
  try {
    const { count = 20, geo, industry, tag } = req.query;

    let url = `https://jobicy.com/api/v2/remote-jobs?count=${count}`;
    if (geo) url += `&geo=${geo}`;
    if (industry) url += `&industry=${industry}`;
    if (tag) url += `&tag=${tag}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

module.exports = { getJobs };
