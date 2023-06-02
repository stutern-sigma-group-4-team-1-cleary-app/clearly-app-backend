// Get Homepage Content
export async function getHomepageContent(req, res) {

  const user = req.user;
console.log(user)

  res.status(200).json({
    message: "Homepage content retrieved successfully",
    status: "Success"
  });
}

