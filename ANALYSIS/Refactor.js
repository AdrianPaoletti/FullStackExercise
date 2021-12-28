exports.inviteUser = (req, res) => {
  const invitationBody = req.body;
  const { shopId } = req.params;
  const authUrl = "https://url.to.auth.system.com/invitation";

  superagent
    .post(authUrl)
    .send(invitationBody)
    .end(async (error, invitationResponse) => {
      const { authId, invitationId } = invitationResponse.body;
      const { email } = invitationBody;
      if (error) {
        return res
          .status(400)
          .send(error || { message: "Could not send invitation" });
      }
      if (invitationResponse.status === 201) {
        await User.findOneAndUpdate(
          authId,
          { authId, email },
          { upsert: true, new: true },
          async (error, createdUser) => {
            if (error) {
              return res
                .status(400)
                .send(error || { message: "Could not update user" });
            }
            await Shop.findById(shopId).exec((error, shop) => {
              const { invitations, users } = shop;
              if (error || !shop) {
                return res
                  .status(404)
                  .send(error || { message: "No shop found" });
              }
              if (invitations.indexOf(invitationId) === -1) {
                invitations.push(invitationId);
              }
              if (users.indexOf(createdUser._id) === -1) {
                users.push(createdUser);
              }
              shop.save();
            });
          }
        );
      } else if (invitationResponse.status === 200) {
        res.status(400).json({
          error: true,
          message: "User already invited to this shop",
        });
        return;
      }
      res.json(invitationResponse);
    });
};
