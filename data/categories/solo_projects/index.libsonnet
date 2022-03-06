local utils = import '../../utils.libsonnet';

utils.makeCategory('Solo Projects', [
  import './chosen.libsonnet',
  import './rock_opera.libsonnet',
  import './compositional_improvs.libsonnet',
  import './home_concert_series.libsonnet',
  import './cmu_session.libsonnet',
  import './misc.libsonnet'
])
