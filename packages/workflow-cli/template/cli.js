function cli(context) {
  context.userFolder = __dirname;

  require('workflow/cli').cli(context);
}

if (require.main === module) {
  cli({});
}

module.exports = { cli };
