module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db
      .collection("User")
      .updateMany(
        { $or: [{ active: { $exists: false } }, { role: { $exists: false } }] },
        { $set: { active: true, role: "USER" } }
      );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db
      .collection("User")
      .updateMany(
        { active: true, role: "USER" },
        { $unset: { active: "", role: "" } }
      );
  },
};
